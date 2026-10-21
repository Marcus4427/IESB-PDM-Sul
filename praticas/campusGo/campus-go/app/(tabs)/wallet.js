import { View, Text, Button, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = expenses ? expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;

  const onShare = async () => {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Bolso</Text>
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={onShare} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, title: { fontSize: 24 }, total: { fontSize: 20, marginVertical: 20, fontWeight: 'bold' } });