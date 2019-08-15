package com.nvr.video.controller;

import com.nvr.video.sql.SqlConnection;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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

    @RequestMapping("url")
    public @ResponseBody String getUrl(Long customerId) throws SQLException {
        Connection connection = SqlConnection.getConnection();

        PreparedStatement preparedStatement = connection.prepareStatement("SELECT nvr_url FROM Custom_conf WHERE customer_id=?");
        preparedStatement.setLong(1,customerId);

        ResultSet resultSet = preparedStatement.executeQuery();
        String url = "";
        while (resultSet.next()) {
            url = resultSet.getString(1);
        }
        return url;
    }
}
