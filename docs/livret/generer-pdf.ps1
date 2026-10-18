# Fabrique les PDF des livrets de règles (pages de 160 x 190 mm) à partir des sources de ce dossier.
#   powershell -ExecutionPolicy Bypass -File docs/livret/generer-pdf.ps1
# Résultat : docs/livret_regles_generations.pdf (français) et docs/rulebook_generations_en.pdf (anglais).
# Il faut un navigateur basé sur Chromium (Brave, Chrome ou Edge) : il sert à « imprimer » la page en PDF.

$ici = $PSScriptRoot
$docs = Split-Path -Parent $ici

$navigateurs = @(
  'C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe',
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
)
$navigateur = $navigateurs | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $navigateur) { throw 'Aucun navigateur Brave, Chrome ou Edge trouvé.' }

# Les pages livret_*.html servent aussi pour le web : on leur ajoute la mise en page d'impression.
$livrets = @(
  @{ source = 'livret_fr.html'; langue = 'fr'; feuilles = @('impression.css'); pdf = 'livret_regles_generations.pdf' },
  @{ source = 'livret_en.html'; langue = 'en'; feuilles = @('impression.css', 'impression_en.css'); pdf = 'rulebook_generations_en.pdf' }
)

foreach ($livret in $livrets) {
  $texte = [System.IO.File]::ReadAllText((Join-Path $ici $livret.source), [System.Text.Encoding]::UTF8)
  $fin = $texte.IndexOf('</style>') + '</style>'.Length
  $liens = ($livret.feuilles | ForEach-Object { "<link rel=`"stylesheet`" href=`"$_`">" }) -join ''
  $page = "<!doctype html><html lang=`"$($livret.langue)`"><head><meta charset=`"utf-8`">" +
    $texte.Substring(0, $fin) + $liens + '</head><body>' + $texte.Substring($fin) + '</body></html>'
  $temporaire = Join-Path $ici ('_imprimer_' + $livret.langue + '.html')
  [System.IO.File]::WriteAllText($temporaire, $page, (New-Object System.Text.UTF8Encoding $false))

  $sortie = Join-Path $docs $livret.pdf
  $adresse = 'file:///' + ($temporaire -replace '\\', '/')
  & $navigateur --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 `
    --run-all-compositor-stages-before-draw "--print-to-pdf=$sortie" $adresse 2>$null | Out-Null
  Remove-Item $temporaire -Confirm:$false
  Write-Output "$($livret.pdf) : $([math]::Round((Get-Item $sortie).Length / 1MB, 1)) Mo"
}
