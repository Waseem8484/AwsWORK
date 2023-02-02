import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from '@aws-amplify/datastore';
import {Todo} from '../../models';
import '@azure/core-asynciterator-polyfill';
const HomeScreen = () => {
  const [AppData, setdata] = useState<any>('');
  const [id, setid] = useState<any>('');

  useEffect(() => {
    GetData();
  }, []);

  const Postdata = () => {
    try {
      DataStore.save(
        new Todo({
          name: 'heeloooo',
          description: 'Mahnat karoo bhai',
        }),
      )
        .then((res: any) => {
          console.log('res', res);
        })
        .catch((err: any) => {
          console.log('error', err);
        })
        .finally(() => {
          console.log('Post saved successfully!');
        });
    } catch (error) {
      console.log('Error saving post', error);
    }
  };

  const GetData = () => {
    try {
      DataStore.query(Todo)
        .then((res: any) => {
          console.log(res);
          setdata(res);
        })
        .catch((err: any) => {
          console.log('eror+++', err);
        })
        .finally(() => {
          console.log('Perfact dataa');
        });
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
  };

  const dataUpdate = (item: any) => {
    try {
      DataStore.save(
        Todo.copyOf(item, (updated: any) => {
          updated.description = '77666666677777';
          updated.name = 'helooo';
        }),
      )
        .then((res: any) => {
          const updatedata = res?.id;
          const upd_obj = AppData.map((item: any) => {
            if (item?.id === res?.id) {
              console.log('inside if case ');
              let obj = {
                _deleted: '',
                _lastChangedAt: '',
                _version: '',
                description: res?.description,
                id: res?.id,
                name: res?.name,
              };
              AppData.push(obj);
              setdata(AppData);
            }
          });
        })
        .catch((err: any) => {
          console.log('error', err);
        });
    } catch (error) {
      console.log('errorr', error);
    }
  };

  const dataDelet = (item: any) => {
    try {
      DataStore.delete(Todo, item?.id)
        .then((res: any) => {
          const deletedTodoId = res[0].id;
          const updatedTodo = AppData.filter(
            (item: any) => item.id !== deletedTodoId,
          );
          setdata(updatedTodo);
        })
        .catch((error: any) => {});
    } catch (error) {}
  };

  const renderitem = (item: any) => {
    return (
      <View
        style={{
          borderRadius: 1,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'white',
          marginTop: 5,
        }}>
        <Text style={{color: 'yellow', fontSize: 20, marginTop: 10}}>
          {item?.description}
        </Text>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => dataUpdate(item)}>
          <Text style={{fontSize: 20, marginLeft: 20, color: 'blue'}}>
            Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => dataDelet(item)}>
          <Text style={{fontSize: 20, marginLeft: 20, color: 'red'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'green'}}>
      <TouchableOpacity
        style={{
          marginTop: 80,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}
        onPress={() => Postdata()}>
        <Text style={{fontSize: 30}}>Post Data</Text>
      </TouchableOpacity>
      <FlatList
        data={AppData}
        renderItem={(item: any) => renderitem(item?.item)}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
