require 'react_on_rails/rendering_extension'

# Shown below are the defaults for configuration
ReactOnRails.configure do |config|
  # Client bundles are configured in application.js

  # Directory where your generated assets go. All generated assets must go to the same directory.
  # Configure this in your webpack config files. This relative to your Rails root directory.
  config.generated_assets_dir = File.join(%w(app assets webpack))

  # Define the files we need to check for webpack compilation when running tests.
  config.webpack_generated_files = %w(
    spree-bundle.js
    spree-bundle.css
    common-bundle.js
    common-bundle.css
    server-bundle.js
  )

  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you may set this to "".
  # If you are using the same file for client and server rendering, having this set probably does
  # not affect performance.
  config.server_bundle_js_file = "server-bundle.js"

  # If you are using the ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  # with rspec then this controls what yarn command is run
  # to automatically refresh your webpack assets on every test run.
  config.npm_build_test_command = "yarn run build:test"

  # This configures the script to run to build the production assets by webpack. Set this to nil
  # if you don't want react_on_rails building this file for you.
  config.npm_build_production_command = "yarn run build"

  ################################################################################
  # CLIENT RENDERING OPTIONS
  # Below options can be overriden by passing options to the react_on_rails
  # `render_component` view helper method.
  ################################################################################
  # default is false
  config.prerender = false

  # default is true for development, off otherwise
  config.trace = Rails.env.development?

  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # If set to true, this forces Rails to reload the server bundle if it is modified
  config.development_mode = Rails.env.development?

  # For server rendering. This can be set to false so that server side messages are discarded.
  # Default is true. Be cautious about turning this off.
  config.replay_console = true

  # Default is true. Logs server rendering messages to Rails.logger.info
  config.logging_on_server = true

  config.raise_on_prerender_error = false # change to true to raise exception on server if the JS code throws

  # Server rendering only (not for render_component helper)
  # You can configure your pool of JS virtual machines and specify where it should load code:
  # On MRI, use `mini_racer` for the best performance
  # (see [discussion](https://github.com/reactjs/react-rails/pull/290))
  # On MRI, you'll get a deadlock with `pool_size` > 1
  # If you're using JRuby, you can increase `pool_size` to have real multi-threaded rendering.
  config.server_renderer_pool_size = 1 # increase if you're on JRuby
  config.server_renderer_timeout = 20 # seconds

  ################################################################################
  # I18N OPTIONS
  ################################################################################
  # Replace the following line to the location where you keep translation.js & default.js for use
  # by the npm packages react-intl. Be sure this directory exists!
  config.i18n_dir = Rails.root.join("client", "app", "locales", "rails")

  # Replace the following line to the location where you keep your client i18n yml files
  # that will source for automatic generation on translations.js & default.js
  # By default(without this option) all yaml files from Rails.root.join("config", "locales") and installed gems are loaded
  config.i18n_yml_dir = Rails.root.join("config", "locales", "react_on_rails")

  ################################################################################
  # MISCELLANEOUS OPTIONS
  ################################################################################

  # The server render method - either ExecJS or NodeJS
  config.server_render_method = "ExecJS"

  # Client js uses assets not digested by rails.
  # For any asset matching this regex, non-digested symlink will be created (what webpack's css wants)
  # To disable symlinks set this parameter to nil.
  config.symlink_non_digested_assets_regex = /\.(png|jpg|jpeg|gif|tiff|woff|ttf|eot|svg|map)/

  # This allows you to add additional values to the Rails Context. Implement one static method
  # called `custom_context(view_context)` and return a Hash.
  config.rendering_extension = ReactOnRails::RenderingExtension

  config.npm_build_production_command = 'yarn run translate && yarn run build:prod'
end
