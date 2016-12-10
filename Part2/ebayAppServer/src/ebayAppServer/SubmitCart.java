package ebayAppServer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class SubmitCart {
	public boolean submitCart (String updateSql,String insertSql)
	{
		
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            int  reuslt  = stmt.executeUpdate(updateSql); 
            if (reuslt>0)
            {
            	try {

                    int  insertResult  = stmt.executeUpdate(insertSql); 
                    if (insertResult>0)
                    {
                    	return true;
                    }     
                } catch (Exception e) {
                    System.out.print("MYSQL ERROR:" + e.getMessage());
                }
            	
            }     
        } catch (Exception e) {
            System.out.print("MYSQL ERROR:" + e.getMessage());
        }
		
		return false;
	}
}
