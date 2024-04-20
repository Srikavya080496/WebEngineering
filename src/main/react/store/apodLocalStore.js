import { create } from 'zustand';

const today =  new Date().toISOString().split('T')[0];

export const useStore = create((set, get) => ({
  selectedForm: 'byDate',
  date: new Date().toISOString().split('T')[0],  // Formats today's date as YYYY-MM-DD
  startDate: '',
  endDate: '',
  count: '',
  imageData: [],
  fetchError: null,
  loading: false,

  setForm: (form) => set({ selectedForm: form }),
  setDate: (date) => set({ date }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setCount: (count) => set({ count }),
  setImageData: (imageData) => set({ imageData }),
  setFetchError: (error) => set({ fetchError: error }),
  resetDate : ()=> set({date:today}),

  fetchData: async () => {
    set({ loading: true, fetchError: null });
    try {
      let url = `/apod?`;
      const { date, startDate, endDate, count } = get();

      if (get().selectedForm === 'byDate' && date) {
        url += `date=${date}`;
      } else if (get().selectedForm === 'byRange' && startDate && endDate) {
        url += `start_date=${startDate}&end_date=${endDate}`;
      } else if (get().selectedForm === 'byCount' && count) {
        url += `count=${count}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        set({ imageData: Array.isArray(data) ? data : [data] });
      } else {
        throw new Error(data.error ? data.error.message : "An unknown error occurred");
      }
    } catch (error) {
      set({ fetchError: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));



// export default useStore;


// import { create } from 'zustand'

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))
