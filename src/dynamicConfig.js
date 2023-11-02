export const getDynamicConfigValue = (envKey) => {

    var value = null;
    if (window._dynamicEnv_) {
        value = window._dynamicEnv_[envKey];
    }
    if (!value) {
        value = process.env[envKey];
    }
    return value;
}

// shortcut with REACT_APP_ prefix
export const config = (envKey) => getDynamicConfigValue(`REACT_APP_${envKey}`);

export const getAppName = () => "Test App"
