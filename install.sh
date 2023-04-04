# remove old link
sudo rm /usr/local/bin/mycli

# create a symlink in a directory that's included in your system's PATH
sudo ln -s "$(pwd)/mycli.sh" /usr/local/bin/mycli

# Make the symlink executable using the following command
sudo chmod +x /usr/local/bin/mycli
