@echo off
echo ===================================================
echo Pushing Kartik's Portfolio to GitHub...
echo ===================================================
cd /d "%~dp0"
git push -u origin main
echo.
echo If the push succeeded, your code is now on GitHub!
echo To enable your website:
echo Go to: https://github.com/kartik444x/portfolio/settings/pages
echo and select 'main' branch, then click Save.
pause
