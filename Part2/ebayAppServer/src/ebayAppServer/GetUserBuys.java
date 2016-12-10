package ebayAppServer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.xml.bind.annotation.*;

@WebService
@XmlAccessorType(XmlAccessType.FIELD)
public class GetUserBuys {
	public String[] getuserbuys (int userid)
	{
		System.out.print("Start get user buys");
		
		String[] tmpAllBuys =new String[10];
		List<String> stringList=new ArrayList<String>();
		try {
            Class.forName("com.mysql.jdbc.Driver").newInstance(); 
            Connection con = null;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/ebaydb", "root", "root"); 
            Statement stmt=con.createStatement();

            String sql = "select tr.id, tr.itemID,ad.name,ad.price,tr.sellerID,"
            		+ "tr.buyerID, u1.FirstName,u1.LastName FROM transactions tr,"
            		+ "advertisements ad, users u1, users u2 where tr.buyerID=u1.userID "
            		+ "AND tr.sellerID= u2.userID AND ad.adid=tr.itemid AND u1.userID="+userid+";";
            
            ResultSet selectRes= stmt.executeQuery(sql);
            System.out.println(sql);
            int i =0;
      /*      while (selectRes.next())
            {
            	i++;
            	System.out.println("buy iteamid"+selectRes.getString("itemID"));
            }  */
            while (selectRes.next())
            {
            	String tmpString= "{\"id\": \""+selectRes.getString("id")+
            			"\",\"itemID\":\""+selectRes.getString("itemID")+
            			"\",\"name\": \""+selectRes.getString("name")+
            			"\",\"price\": \""+selectRes.getString("price")+
            			"\",\"sellerID\":\""+selectRes.getString("sellerID")+
            			"\",\"buyerID\": \""+selectRes.getString("buyerID")+
            			"\",\"FirstName\": \""+selectRes.getString("FirstName")+
            			"\",\"LastName\": \""+selectRes.getString("LastName")+"\"}";
            	stringList.add(tmpString);
            	if (i>=tmpAllBuys.length)
            	{
            		tmpAllBuys = new String[i +5];
            	}
            	tmpAllBuys[i]=tmpString;
            	i++;
            }        
            tmpAllBuys = new String[i];
            
            //System.out.println(tmpAllBuys.toString());
            System.out.println("tmpAllBuys size:" + i);
            
        } catch (Exception e) {
            System.out.print("MYSQL ERROR(user buys):" + e.getMessage());
        }
		 System.out.println("userBuys end");
		//return tmpAllBuys;
		return stringList.toArray( new String[stringList.size()] );
	}
}
