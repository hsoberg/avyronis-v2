# Extract the phone screen area from the reference image
Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\HenningNavrud-Søberg\prosjekter\avyronis-v3\public\hf_20260410_094220_669317af-37a3-455e-b975-8cfb9dda9d6f.png"
$outPath = "C:\Users\HenningNavrud-Søberg\prosjekter\avyronis-v3\public\cases\aktivhelse-mobile.png"

$src = [System.Drawing.Image]::FromFile((Resolve-Path $srcPath).Path)
Write-Host "Source: $($src.Width) x $($src.Height)"

# The phone screen in the reference image is approximately:
# Left edge: ~1130px, Top edge: ~175px, Right edge: ~1390px, Bottom edge: ~650px
# But these are relative to the image dimensions. Let's calculate proportionally.
$imgW = $src.Width
$imgH = $src.Height

# Phone screen coordinates (estimated from the reference)
$phoneLeft = [int]($imgW * 0.77)
$phoneTop = [int]($imgH * 0.22)
$phoneRight = [int]($imgW * 0.955)
$phoneBottom = [int]($imgH * 0.92)

$cropW = $phoneRight - $phoneLeft
$cropH = $phoneBottom - $phoneTop

Write-Host "Cropping: x=$phoneLeft y=$phoneTop w=$cropW h=$cropH"

$cropRect = New-Object System.Drawing.Rectangle($phoneLeft, $phoneTop, $cropW, $cropH)
$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$src.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved: $($bmp.Width) x $($bmp.Height) -> $outPath"
$bmp.Dispose()
