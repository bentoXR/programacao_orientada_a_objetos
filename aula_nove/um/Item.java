public class Item {
    private int codigo;

    public Item(int codigo) {
        this.codigo = codigo;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    @Override
    public String toString() {
        return "Item{" +
                "codigo=" + codigo +
                '}';
    }
}
