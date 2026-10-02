import java.util.Calendar;

public class Principal {
    public static void main(String[] args) {
        Medico m1 = new Medico("Marcos");
        Paciente p1 = new Paciente("Marcia",1986);
        Calendar calendar = Calendar.getInstance();
        Consulta c1 = new Consulta(calendar.get(Calendar.DAY_OF_MONTH),
                calendar.get(Calendar.HOUR),300,m1,p1);
        Paciente p2 =new Paciente("Denise",1990);
        Consulta c2 = new Consulta(calendar.get(Calendar.DAY_OF_MONTH),
                calendar.get(Calendar.HOUR)+1,300,m1,p2);
        System.out.println(c1);
        System.out.println(c2);

        m1.adicionar(c1);
        m1.adicionar(c2);
        System.out.println(m1.getConsultas());

        Medico m2 = new Medico("Pedro");
        Consulta c3 = new Consulta(calendar.get(Calendar.DAY_OF_MONTH),
                calendar.get(Calendar.HOUR)+1,300,m2,p1);
        p1.adicionar(c1);
        p1.adicionar(c3);
        System.out.println(p1.getConsultas());
    }//main
}//class
