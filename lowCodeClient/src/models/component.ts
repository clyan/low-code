
import aixos from '@/utils/request';
import { component } from '@/utils/api';
import { ImmerReducer, Effect, Subscription  } from 'umi';
export interface ComponentModelState {
  componentList: Array<Object>;
}

export interface ComponentModelType {
  namespace: 'Component';
  state: ComponentModelState;
  effects: {
    fetchComponents: Effect
  };
  reducers: {
    // save: Reducer<IndexModelState>;
    // 启用 immer 之后
    getComponentList: ImmerReducer<ComponentModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ComponentModel:ComponentModelType = {
  namespace: 'Component',
  state: {
    componentList: [],
  },
  effects: {
    *fetchComponents({ payload }, { call, put }) {
      const getComponents = async () => {
        return await aixos.get(component);
      }
      const resp = yield call(getComponents, payload);
      yield put({
        type: 'getComponentList',
        payload: resp.data,
      });
    }
  },
  reducers: {
    getComponentList(state :any, action:any) {
      return {
        ...state,
        componentList : action.payload
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // if (pathname === '/') {
        //   dispatch({
        //     type: 'fetchComponents',
        //   })
        // }
      });
    }
  }
};
export default ComponentModel;