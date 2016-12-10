package ebayAppServer;

import java.sql.*;
import java.util.*;
import javax.jws.WebService;

@WebService
public class Login {
	public Map<String, Integer> login(String username, String password){
		Map<String, Integer> returnRes = new HashMap<>();
		returnRes.put("statusCode", 400);
		returnRes.put("userID", 0);
		try {
			Connection con = null;
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            
            Statement stmt; 
            stmt = con.createStatement();
            System.out.println("user:"+username+", password:"+password+", try to login in");
            String sql = "SELECT userID from users WHERE Email=\""+ username +"\" AND Password=\"" + password+"\"";
            ResultSet selectRes= stmt.executeQuery(sql);
            System.out.println(sql);
            
           
            if (selectRes.next())
            {
            	returnRes.put("statusCode", 200);
            	returnRes.put("userID", selectRes.getInt("userID"));
            }
            
        } catch (Exception e) {
            System.out.print("MYSQL ERROR:" + e.getMessage());
            
        }
		return returnRes;
	}
}
