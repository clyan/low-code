const CommonModel = {
  namespace: 'Edit',
  state: {
    currentDrag: '',
    editData:[],
    revocationData:[],
    currentEditData: null,
    editSize: {
      sizeX: 375,
      sizeY: 667,
    }, //页面尺寸
  },
  effects: {
  },
  reducers: {
    setCurrentDrag(state :any, action:any) {
      return {
        ...state,
        currentDrag : action.payload
      }
    },
    setEditSize(state :any, action:any) {
      return {
        ...state,
        editSize : action.payload
      }
    },
    addEditData(state, { payload }) {
      let editData = [...state.editData, payload];
      return {
        ...state,
        editData,
        currentEditData: payload
      };
    },
    clearEditCanvas(state , { payload }) {
        return {
          ...state,
          editData: [],
          currentEditData: null
        }
    },
    revocationEditCanvas(state , { payload }) {
      let data = [ ...state.editData ];
      let revocation = data.splice(data.length - 1, 1);
      return {
        ...state,
        editData: [...data],
        revocationData: [...state.revocationData, ...revocation],
        currentEditData: data.length > 0 ? data[data.length - 1]  : null,
      }
    },
    recoverEditCanvas(state , { payload }) {
      let data = [ ...state.revocationData ];
      let recover = data.splice(data.length - 1, 1);
      return {
        ...state,
        editData: [...state.editData, ...recover],
        revocationData: [...data],
        currentEditData: recover,
      }
    },
    updateEditData(state , { payload }) {
      const { id } = payload;
      const editData = state.editData.map(item => {
        if (item.id === id) {
          // console.log('payload', payload)
          return {
            ...payload
          };
        }
        return { ...item };
      });
      // console.log('editData', editData);
      return {
        ...state,
        editData: [...editData],
        currentEditData: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // if (pathname === '/') {
        //   dispatch({
        //     type: 'fetchCommons',
        //   })
        // }
      });
    }
  }
};
export default CommonModel;