package calwebserver;
import javax.jws.*;

@WebService
public class Cal {
	public double cal(double first_num,double sec_num, int operator){
		double result = 0.0;

		 switch (operator)  {
	        case 1:
	        	result=first_num + sec_num;
	            break;

	        case 2:
	        	result=first_num - sec_num;
	            break;

	        case 4:
	        	result=first_num / sec_num;
	            break;

	        case 3:
	        	result=first_num * sec_num;
	            break;
		 }
		 System.out.println(result);
		 return result;
	}
}
