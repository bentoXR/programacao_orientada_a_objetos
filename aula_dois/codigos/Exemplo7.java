public class Exemplo2 {

    public static void main(String[] args) {
        int m[][] = new int[2][3];
        m[0][2] = 10;
        m[1][1] = 50;

        char c[][] = new char[2][4];
        c[0][2] = 'a';
        c[1][3] = 'b';

        int m1[][] = new int[4][2];
        int valor = 100;
        for (int i = 0; i < 4; i++) {
            for (int z = 0; z < 2; z++) {
                m1[i][z] = valor;
                valor += 4;
                System.out.printf("%d-%d: %d", i, z, m[i][z]);
            }//for
            System.out.println();
        }//for

    }//main

}
