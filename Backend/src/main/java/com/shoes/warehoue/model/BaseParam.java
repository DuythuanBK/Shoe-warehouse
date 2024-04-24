package com.shoes.warehoue.model;

import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseParam {
    protected Integer offset;
    protected Integer limit;

    @AssertTrue
    protected boolean getValidPage() {
        return (offset != null && limit != null) || (offset == null && limit == null);
    }

    public <T> String getQueryString(T instance) {
        String ret = "";
        int count = 0;
        Class<?> clazz = instance.getClass();

        // Get all declared fields including those in the superclass
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                String fieldName = field.getName();
                Object fieldValue = field.get(instance);
                if(fieldValue != null) {
                    if(count > 0) {
                        ret = "and " +  fieldName + "=";
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return ret;
    }
}
