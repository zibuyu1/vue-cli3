import { MutationTree } from 'vuex';
const mutations: MutationTree<any> = {
  // 同步调用
  setListTest(state, arr): void {
    state.listTest = arr;
  },
};
export default mutations;
