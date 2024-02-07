#!/bin/bash

##
# edit the index-xxxx.js Bloom file to add the necessary command to share the
# redux store to window.store.
# usage: ./sharestore.sh <path to index-xxxxxx.js file>
# v0.1 (02/06/2024)
#
perl -i.bkp -pe 's/(\(\{reducer:[^,]+,middleware:.*?);return\s([a-zA-z]+)/${1};window.store=$2;return $2/' $1
