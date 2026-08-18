#!/bin/bash

flag="$1"
message="$2"

if [[ $flag != "-m" || $message == "" ]]; then
    while true; do
        read -p "no message set do you want to continue? (y/n): " answer
        case "$answer" in
            [Yy]* )
                break;;
            [Nn]* )
                exit 1;;
            * )
                echo "invalid input.";;
        esac
    done
fi

start_time=$(date +%s%N)
echo "updating website..."

echo "running staging script..."
./stage.sh
if [[ $? -ne 0 ]]; then
    echo "stage script failed!"
    exit 1;
fi

echo "running deploy script"
./deploy.sh "$message"
if [[ $? -ne 0 ]]; then
    echo "deploy script failed!"
    exit 1;
fi

end_time=$(date +%s%N)
duration=$(( (end_time - start_time) / 1000000 ))

echo "update complete in $duration milliseconds!"
echo "website ready!"
exit 0