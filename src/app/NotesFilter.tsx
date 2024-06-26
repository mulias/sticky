"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from "use-debounce";
import { listNotes, searchNotes } from "@/app/actions";
import type { NoteObj } from "@/entity/Note";
import { castNumber } from "@/lib/env";

const QUERY_DEBOUNCE_MILLISECONDS =
  castNumber(process.env.NOTES_SEARCH_DEBOUNCE_MILLISECONDS) ?? 300;

interface Props {
  setNotes: (notes: NoteObj[]) => void;
}

const NotesFilter = ({ setNotes }: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, QUERY_DEBOUNCE_MILLISECONDS);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  // Repopulate the displayed notes based on user query
  useEffect(() => {
    const search = async () => {
      if (debouncedQuery === "") {
        setNotes(await listNotes());
      } else {
        setNotes(await searchNotes(debouncedQuery));
      }
    };

    // Skip the initial mount, only search when the query is changed.
    if (didMount) {
      search();
    } else {
      setDidMount(true);
    }
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <label className="flex flex-row gap-2 items-baseline">
      <p>Filter:</p>
      <input
        type="text"
        placeholder="find some notes"
        onChange={handleChange}
        className="border-b border-gray-200 bg-transparent pt-4 pb-1.5 text-sm outline outline-0 transition-all focus:border-gray-900 focus:outline-0"
      />
    </label>
  );
};

export default NotesFilter;
