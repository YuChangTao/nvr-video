package com.nvr.video.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

/**
 * @author yutyi
 * @date 2019/03/05
 */
@Controller
@RequestMapping("/video")
public class NvrController {

    @RequestMapping("/list")
    public String index(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin","*");
        return "/screen_video";
    }
}
