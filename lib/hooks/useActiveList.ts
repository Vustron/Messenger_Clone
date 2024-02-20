import { create } from 'zustand';
import { ActiveListStore } from '@/lib/interfaces';

const useActiveList = create<ActiveListStore>((set) => ({
	members: [],
	add: (id) => set((state) => ({ members: [...state.members, id] })),
	remove: (id) =>
		set((state) => ({
			members: state.members.filter((memberId) => memberId !== id),
		})),
	set: (ids) => set({ members: ids }),
}));

export default useActiveList;
