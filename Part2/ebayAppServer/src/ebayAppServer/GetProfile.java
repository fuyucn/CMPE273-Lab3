package ebayAppServer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.jws.WebService;

@WebService
public class GetProfile {
	public String[] getProfile (int userid)
	{
		String userInfo[] = new String[3];
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            String sql = "SELECT userid, firstname, lastname, "
            		+ "email,location FROM users WHERE userid="+userid;
            
            ResultSet selectRes= stmt.executeQuery(sql);
            System.out.println(sql);
            
            if (selectRes.next())
            {
            	userInfo[0]=selectRes.getString("userid");
            	userInfo[1]=selectRes.getString("firstname");
            	userInfo[2]=selectRes.getString("lastname");
            	userInfo[3]=selectRes.getString("email");
            	userInfo[4]=selectRes.getString("location");
            }   
            
        } catch (Exception e) {
            System.out.print("MYSQL ERROR: usererr: " + e.getMessage());
        }
		return userInfo;
	}
}
