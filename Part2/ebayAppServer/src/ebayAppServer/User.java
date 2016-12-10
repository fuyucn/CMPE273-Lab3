package ebayAppServer;

import java.sql.*;
import java.util.*;
import javax.jws.WebService;

import java.util.*;
@WebService
public class User {
	

	
	public String[] getUserInfo (int userid)
	{
		String userInfo[] = new String[3];
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            String sql = "SELECT userid, firstname, lastname FROM users"
            		+ " WHERE userid='"+userid+"';";
            
            ResultSet selectRes= stmt.executeQuery(sql);
            System.out.println(sql);
            
            if (selectRes.next())
            {
            	userInfo[0]=selectRes.getString("userid");
            	userInfo[1]=selectRes.getString("firstname");
            	userInfo[2]=selectRes.getString("lastname");
           
            }   
            
        } catch (Exception e) {
            System.out.print("MYSQL ERROR: usererr: " + e.getMessage());
        }
		return userInfo;
	}
			
}
