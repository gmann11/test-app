import React from 'react';
import "./BloomFrame.css";
import localforage from "localforage";
import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";
import { getDynamicConfigValue, config } from "../dynamicConfig";

const encrypt = (payload) => {
  const hashKey = uuid()
  const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), hashKey).toString()
  return { encryptedPayload, hashKey }
};

const setBloomCredentials = async ({hostPortNoProtocol, user, password, expiresAt}) => {
  return new Promise((resolve, reject) => {
    var payload = encrypt({username: user, password: password});
    var cnew = {
      host: `junk://${hostPortNoProtocol}`,
      expiresAt: expiresAt
    };

    var credsnew = {...cnew, ...payload};
    console.log("Credsnew: ", credsnew);

    localforage.setItem('neo4j.bloom.credentials', credsnew)
      .then(function (value) {
        console.log("Credentials Res: ", value);
        resolve(value);
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
    });
  })
};

const BloomFrame = ({selectedRow}) => {
    let uu = config("NEO4J_PROTOCOL")+"://"+config("NEO4J_HOST")+":"+config("NEO4J_PORT")+"/";
    setBloomCredentials({user:config("NEO4J_USER"),password:config("NEO4J_PWD"),expiresAt:Date.now() + (30*60*1000),hostPortNoProtocol:uu});
    console.log("selbloom:", selectedRow);
    var bloomURL =  (typeof selectedRow !== 'string') ? '/bloom/?run=true&search=Entity%20id%20' + selectedRow : '/bloom/';
    const keyUrl = bloomURL.replace(/\W/g, '_');

    return (
      <div className="bloom-container" >
          <iframe key={`key-${keyUrl}`} className="bloom-iframe"
            id="inlineFrameExample"
            title="Bloom Embed"
            src={bloomURL}
          />
      </div>
    );
}

export default BloomFrame;
