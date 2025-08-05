# In flox.nix
{
  # This section lists the system-level packages you want Flox to install.
  packages = [
    # We are specifying a stable, Long-Term Support (LTS) version of Node.js.
    # This ensures everyone uses the same version of the JavaScript runtime.
    pkgs.nodejs-20_x,

    # It's good practice to also explicitly include npm.
    pkgs.nodePackages.npm,
  ];
}
