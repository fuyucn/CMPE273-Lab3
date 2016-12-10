package ebayAppServer;

import java.lang.reflect.Array;
import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.jws.WebService;
import java.util.*;
@WebService
public class GetUserSells {
	public Map getusersells (int userid)
	{
		System.out.print("Start get user sells");
		
		Map tmpAllSells =new HashMap<>();
	
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            String sql = "SELECT name, price, adID FROM advertisements"
            		+ " WHERE sellerID='"+userid+"';";
            
            ResultSet selectRes= stmt.executeQuery(sql);
            System.out.println(sql);

            System.out.println("loop to create list");

            int i =0;
            while (selectRes.next())
            {
            	Map<String, String> tmp = new HashMap<>();
            	tmp.put("name", selectRes.getString("name"));
            	tmp.put("price", selectRes.getString("price"));
            	tmp.put("adID", selectRes.getString("adID"));
            	tmpAllSells.put(i,tmp);
            	i++;
            }  
            System.out.println(tmpAllSells.toString());
            System.out.println("User Sells size:" + i);
        } catch (Exception e) {
            System.out.print("MYSQL ERROR(user sells):" + e.getMessage());
        }
		 System.out.println("UserSells end");
		return tmpAllSells;
	}
	

}
