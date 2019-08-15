package com.nvr.video.sql;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * @author yutyi
 * @date 2019/08/15
 */
public class SqlConnection {
    private static final String url = "jdbc:sqlserver://47.105.46.104:1433;Databasename=BME_Test";
    private static final String name = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String username = "BMEUSER";
    private static final String password = "BMEUSER123";
    public static Connection getConnection() {
        try{
            //加载驱动
            Class.forName(name);
            //创建连接对象
            Connection con = DriverManager.getConnection(url,username,password);

            return con;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
