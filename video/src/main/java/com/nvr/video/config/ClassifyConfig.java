package com.nvr.video.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;

/**
 * 分类
 *
 * @author yutyi
 * @date 2019/05/17
 */
@Component
@ConfigurationProperties(prefix = "nvr.config")
public class ClassifyConfig {

    private String classify;

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }


    public Map<String,Object> getConfig() {
        try {
            if (StringUtils.isEmpty(this.classify)) {
                return null;
            }
            Map<String,Object> map = new HashMap<>(8);
            String[] areaList = this.classify.split("\\|\\|");
            for (String area : areaList) {
                String areaName = area.substring(0, area.indexOf("|"));
                String channlStr = area.substring(area.indexOf("|") + 1);
                List<String> list = new ArrayList<>();
                if (!StringUtils.isEmpty(channlStr)) {
                    list = Arrays.asList(channlStr.split(","));
                }
                map.put(areaName,list);
            }
            return map;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

}
