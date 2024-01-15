export type UnsavedEntry = {
  title: string;
  notes: string;
  photoUrl: string;
};
export type Entry = UnsavedEntry & {
  entryId: number;
};

// const data = {
//   entries: [] as Entry[],
//   nextEntryId: 1,
// };

// window.addEventListener('beforeunload', function () {
//   const dataJSON = JSON.stringify(data);
//   localStorage.setItem('code-journal-data', dataJSON);
// });

// const localData = localStorage.getItem('code-journal-data');
// if (localData) {
//   data = JSON.parse(localData);
// }

// export function readEntries(): Entry[] {
//   return data.entries;
// }

// export function addEntry(entry: UnsavedEntry): Entry {
//   const newEntry = {
//     ...entry,
//     entryId: data.nextEntryId++,
//   };
//   data.entries.unshift(newEntry);
//   return newEntry;
// }

// export function updateEntry(entry: Entry): Entry {
//   const newEntries = data.entries.map((e) =>
//     e.entryId === entry.entryId ? entry : e
//   );
//   data.entries = newEntries;
//   return entry;
// }

// export function removeEntry(entryId: number): void {
//   const updatedArray = data.entries.filter(
//     (entry) => entry.entryId !== entryId
//   );
//   data.entries = updatedArray;
// }

export async function readEntries(): Promise<Entry[]> {
  const res = await fetch('/api/entries');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addEntry(entry: UnsavedEntry): Promise<Entry> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  };
  const res = await fetch('/api/entries', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function updateEntry(entry: Entry): Promise<Entry> {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  };
  const res = await fetch(`/api/entries/${entry.entryId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function removeEntry(entryId: number): Promise<void> {
  const req = {
    method: 'DELETE',
  };
  const res = await fetch(`/api/entries/${entryId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
