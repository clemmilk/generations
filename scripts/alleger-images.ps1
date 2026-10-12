# Fabrique des copies allégées des visuels, pour que le site se charge vite :  npm run images
#
# Les originaux de visuels/ ne sont jamais modifiés. Les copies vont dans visuels-web/, avec les mêmes
# noms et les mêmes dossiers. C'est visuels-web/ que le site affiche.
# À relancer chaque fois qu'un visuel est ajouté ou modifié dans visuels/.
#
# (Script PowerShell, pour Windows : il utilise l'outil de dessin fourni avec Windows, sans rien installer.)

Add-Type -AssemblyName System.Drawing

$racine = Split-Path -Parent $PSScriptRoot
$source = Join-Path $racine 'visuels'
$cible = Join-Path $racine 'visuels-web'

# Largeur des copies, en pixels, selon le dossier. Environ 2 fois la taille affichée à l'écran,
# pour rester net sur une tablette.
$largeurs = @{ 'cartes' = 480; 'tuiles' = 320; 'plateau' = 96 }
$qualiteJpeg = 82

# Le plateau complet n'est pas affiché par l'application.
$ignores = @('plateau_perso.jpg')

$codecJpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$reglages = New-Object System.Drawing.Imaging.EncoderParameters 1
$reglages.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$qualiteJpeg)

if (Test-Path -LiteralPath $cible) { Remove-Item -LiteralPath $cible -Recurse -Force -Confirm:$false }

$avant = 0; $apres = 0; $nombre = 0
foreach ($fichier in Get-ChildItem -LiteralPath $source -Recurse -File) {
  if ($ignores -contains $fichier.Name) { continue }
  $relatif = $fichier.FullName.Substring($source.Length + 1)
  $largeur = $largeurs[$relatif.Split('\')[0]]
  if (-not $largeur) { Write-Warning "Dossier inconnu, fichier ignoré : $relatif"; continue }

  $sortie = Join-Path $cible $relatif
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $sortie) | Out-Null

  $image = [System.Drawing.Image]::FromFile($fichier.FullName)
  $l = [Math]::Min($largeur, $image.Width)
  $h = [int][Math]::Round($image.Height * $l / $image.Width)
  $copie = New-Object System.Drawing.Bitmap $l, $h
  $dessin = [System.Drawing.Graphics]::FromImage($copie)
  $dessin.InterpolationMode = 'HighQualityBicubic'
  $dessin.PixelOffsetMode = 'HighQuality'
  $dessin.DrawImage($image, 0, 0, $l, $h)
  $dessin.Dispose()
  $image.Dispose()

  if ($fichier.Extension -eq '.png') { $copie.Save($sortie, [System.Drawing.Imaging.ImageFormat]::Png) }
  else { $copie.Save($sortie, $codecJpeg, $reglages) }
  $copie.Dispose()

  $avant += $fichier.Length; $apres += (Get-Item -LiteralPath $sortie).Length; $nombre++
}

"{0} images allégées : {1:N1} Mo -> {2:N1} Mo (dans visuels-web/)." -f $nombre, ($avant / 1MB), ($apres / 1MB)
