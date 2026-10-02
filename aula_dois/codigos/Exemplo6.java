public class Exemplo {
    public static void main(String[] args) {

        int a[] = new int[4];
        a[0] = 12;
        a[1] = 22;
        a[2] = 33;
        a[3] = 44;

        System.out.println(a[2]);

        double b[] = new double[5];
        b[4] = 45.3;

        boolean c[] = new boolean[2];
        c[0] = false;

        char d[] = new char[4];
        d[0] = 'w';
        d[1] = 5;
        d[2] = '5';

        System.out.println(d[1]);
        System.out.println(d[2]);

        String e[] = new String[2];
        e[0] = "frase";
        e[1] = "letra";
        System.out.println(e[0]);
        System.out.println(e[1]);
        
        int valor = 10;
        int vetor[] = new int[4];
        for(int i=0;i<4;i++){
           vetor[i] = valor;
           valor = valor+100;
           System.out.println(vetor[i]);
        }

    }
}
