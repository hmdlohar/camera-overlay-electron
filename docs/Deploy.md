## How to create a new Release?
- change the version in `package.json`
- commit the changes
- create a tag with command `git tag [v*]`
- push using `git push --tags`

- `build-appimage.yml` will build app image for linux when pushed with tag starting with `v`. 
The will automatically create release and place the files inside that release. 