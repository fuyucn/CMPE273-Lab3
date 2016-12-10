package ebayAppServer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

public class GetItem {
	public String getItem (String sql)
	{
		System.out.print("Start get user sells");
		
		String item = null;
	
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            ResultSet selectRes= stmt.executeQuery(sql);

            int i =0;
            while (selectRes.next())
            {
/*            	Map<String, String> tmp = new HashMap<>();
            	tmp.put("name", selectRes.getString("name"));
            	tmp.put("price", selectRes.getString("price"));
            	tmp.put("adID", selectRes.getString("adID"));
            	tmpAllSells.put(i,tmp);
            	i++;*/
            	item="{ \"adid\":\""+selectRes.getString("adid")+"\","
            			+ "\"name\":\""+selectRes.getString("name")+"\","
            			+ "\"detail\":\""+selectRes.getString("detail")+"\","
            			+ "\"price\":\""+selectRes.getString("price")+"\","
            			+ "\"quantity\":\""+selectRes.getString("quantity")+"\","
            			+ "\"location\":\""+selectRes.getString("location")+"\","
            			+ "\"sellerid\":\""+selectRes.getString("sellerid")+"\","
            			+ "\"firstname\":\""+selectRes.getString("firstname")+"\","
            			+ "\"lastname\":\""+selectRes.getString("lastname")+"\"}";
            }  

        } catch (Exception e) {
            System.out.print("MYSQL ERROR(user sells):" + e.getMessage());
        }
		 System.out.println("UserSells end");
		return item;
	}
}
