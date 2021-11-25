package com.reactnativedtsdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@ReactModule(name = DtSdkModule.NAME)
public class DtSdkModule extends ReactContextBaseJavaModule {
    public static final String NAME = "DtSdk";

    public DtSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("timeZone", TimeZone.getDefault().getID());
        return constants;
    }

    public static native int nativeMultiply(int a, int b);
}
