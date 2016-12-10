package ebayAppServer;

import java.sql.*; 

import javax.jws.WebService;
@WebService
public class Register {
	public boolean reg (String username, String password, String firstname, String lastname, String location)
	{
		
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            String sql = "INSERT INTO users (email, password, firstname, lastname,location) "
            		+ "VALUES ('"+ username +"','"+ password +"','"
            		+ firstname +"','"+ lastname +"','"+ location +"')";
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
