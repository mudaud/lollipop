module.exports = {
  /**
   * Type: string | false
   *
   * The deployment path defaults to 'creator/campaign/wallpaper/num_hash'.
   * The campaign and wallpaper names are read from your folder structure.
   * If you want to override the default path, set this option to any path of
   * your choice. When overriding the path, no num_hash will be added to your
   * path. If you want versioning, update deployPathOverride manually.
   *
   * NOTE: check if your custom path isn't already in use in the S3 bucket!
   */
  deployPathOverride: false,

  /**
   * Type: string[]
   *
   * If you want a wallpaper to be built multiple times, for example if you
   * want to account for different trackers in NL and USA, you can set this
   * option to ['nl', 'usa']. This does the following things while deploying:
   *
   * - Your wallpaper will be built and deployed twice
   * - In your wallpaper, process.env.VARIANT is set to either 'nl' or 'usa'
   * - You're free to have any custom split logic based on that variable
   * - You'll get back multiple deployment URLs:
   *     - adpreview.wetransfer.com/.../nl
   *     - adpreview.wetransfer.com/.../usa
   *
   * NOTE:
   * - while in development, process.env.VARIANT is always `undefined`.
   * - variants can contain forward slashes, e.g. 'image1/usa'
   */
  variants: [],
};
