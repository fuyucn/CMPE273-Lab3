package ebayAppServer;

import java.sql.*;
import java.util.*;
import javax.jws.WebService;

import java.util.*;
@WebService
public class AddItem {
	public boolean addItem (String sql)
	{
		
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            int  reuslt  = stmt.executeUpdate(sql); 
            if (reuslt>0)
            {
            	return true;
            }     
        } catch (Exception e) {
            System.out.print("MYSQL ERROR:" + e.getMessage());
        }
		
		return false;
	}
}
