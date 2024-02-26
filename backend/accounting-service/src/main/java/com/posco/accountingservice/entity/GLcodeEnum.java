package com.posco.accountingservice.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum GLcodeEnum {
    //GL_CODE_A101(Arrays.asList(111081, 0000,"N")),
    GL_CODE_1501(Arrays.asList(522141, 2301, "Y")),
    GL_CODE_X100(Arrays.asList(111121, 0000, "N")),
    GL_CODE_1699(Arrays.asList(522141, 1699, "Y")),
    GL_CODE_2599(Arrays.asList(522141, 2599, "Y")),
    GL_CODE_2505(Arrays.asList(522141, 2505, "Y")),
    GL_CODE_W200(Arrays.asList(530699, 0000, "N")),
    GL_CODE_W100(Arrays.asList(420699, 0000, "N")),
    GL_CODE_A204(Arrays.asList(900302, 0000, "N")); //환입
    private List<Object> values;

    GLcodeEnum(List<Object> values) {
        this.values = values;
    }
    public List<Object> getValues() {
        return values;
    }

    public static List<Object> getValuesByCode(String code) {
        for (GLcodeEnum glCode : GLcodeEnum.values()) {
            if (glCode.name().equals("GL_CODE_" + code)) {
                return glCode.getValues();
            }
        }
        return new ArrayList<>();
    }
}
