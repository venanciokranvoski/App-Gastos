import React from 'react';
import {Container, Tipo, IconView, TipoText, ValorText} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

export default function HistoricoList({data, deleteItem }) {
 return (
    <TouchableWithoutFeedback onLongPress={ () => deleteItem(data)  }>
        <Container>
            <Tipo>
                <IconView tipo={data.tipo}>
                    <AntDesign 
                        name={data.tipo === 'despesa' ? 'arrowdown' : 'arrowup' } 
                        size={24} 
                        color="black" 
                    />   
                    <TipoText>{data.tipo}</TipoText> 
                </IconView> 
            </Tipo>
            <ValorText>
                R$ {data.valor} - {data.date}
            </ValorText>
        </Container>
    </TouchableWithoutFeedback>
  );
}