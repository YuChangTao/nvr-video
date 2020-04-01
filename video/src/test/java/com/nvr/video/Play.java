package com.nvr.video;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @author yutyi
 * @date 2020/01/12
 */
public class Play {

    public static void main(String[] args) {
        String cmd = "cmd /c F: && cd F:\\tmp\\video\\nginx-rtmp-win32-dev && start nginx";
        //关闭nginx
        //String stop ="cmd /c E: && cd nginx && nginx.exe -s quit";
        Runtime run = Runtime.getRuntime();
        try {
            java.lang.Process process = run.exec(cmd);
            InputStream in = process.getInputStream();
            System.out.println(cmd);
//            while (in.read()!=-1){
//                System.out.println(in.read());
//            }
//            in.close();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void ffmpeg() {
        String all = "cmd /c start ffmpeg -i \"rtsp://admin:123456@192.168.2.165:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif\" "
                + "-f flv -r 25 -an -s 640*480 \"rtmp://127.0.0.1:1935/hls/mystream\"";
        String line =null;
        StringBuilder sb = new StringBuilder();
        Runtime runtime = Runtime.getRuntime();
        try {
            System.out.println(all);
            java.lang.Process process = runtime.exec(all);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            while((line = bufferedReader.readLine())!= null){
                sb.append(line + "\n");
                System.out.println(line);
                process.destroy();
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
