package com.nvr.video.controller;

import com.nvr.video.config.ClassifyConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 分类
 *
 * @author yutyi
 * @date 2019/05/17
 */
@RestController
@RequestMapping("config")
public class ClassifyController {

    @Autowired
    private ClassifyConfig classifyConfig;

    @RequestMapping("classify")
    public Map<String,Object> classify() {
        return classifyConfig.getConfig();
    }
}
