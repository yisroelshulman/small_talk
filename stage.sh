#!/bin/bash

start_stage_time=$(date +%s%N)
source_dir="dev"
destination_dir="docs"
ready="ready_to_deploy"

if [[ -d $source_dir ]]; then
    echo "staging website..."
else
    echo "staging failed: no files to stage."
    exit 1
fi

if [[ ! -d $destination_dir ]]; then
    echo "staging failed: destination directories missing."
    exit 1
fi

echo "cleaning old files and directories..."
rm -r $destination_dir/styles
rm -r $destination_dir/js
rm $destination_dir/*.html
echo "cleaning files and directories done!"

echo "copying new files and directories..."
cp -r "$source_dir/." "$destination_dir"
mv $destination_dir/home.html $destination_dir/index.html
touch "$ready"
echo "copying files and directories done!"

end_stage_time=$(date +%s%N)
duration=$(( (end_stage_time - start_stage_time) / 1000000 ))

echo "staging complete in $duration milliseconds!"
echo "ready to deploy!"
exit 0