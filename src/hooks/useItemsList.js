import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function useItemList() {
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            let userId = (await supabase.auth.getUser()).data.user.id;

            try {
                const { data, error } = await supabase
                    .from("items")
                    .select("*")
                    .eq("creator_id", userId);

                setItems(
                    data.sort(
                        (a, b) =>
                            Number(new Date(a.created_at)) -
                            Number(new Date(b.created_at))
                    )
                );
                if (error) {
                    setError(error);
                    console.error(error);
                }
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }
        async function setupSubscription() {
            let userId = (await supabase.auth.getUser()).data.user.id;

            supabase
                .channel(`public:items:creator_id=eq.${userId}`)
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "items",
                    },
                    (payload) => {
                        setItems((prevArray) => [...prevArray, payload.new]);
                    }
                )
                .on(
                    "postgres_changes",
                    {
                        event: "DELETE",
                        schema: "public",
                        table: "items",
                    },
                    (payload) => {
                        setItems((prevArray) =>
                            prevArray.filter(
                                (item) => item.id !== payload.old.id
                            )
                        );
                    }
                )
                .subscribe();
        }

        setupSubscription();
        fetchItems();
    }, []);

    async function addListItem() {
        if (!desc || !amount) {
            Alert.alert(
                "Cannot add empty list item",
                "Both item description and amount must be provided"
            );
            return;
        }

        try {
            const id = (await supabase.auth.getUser()).data.user.id;

            const { error } = await supabase
                .from("items")
                .insert({ desc, amount, checked: false, creator_id: id });

            if (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }

        setDesc("");
        setAmount("");
    }

    async function setChecked(id, checked) {
        const { error } = await supabase
            .from("items")
            .update({ checked: !checked })
            .eq("id", id)
            .select("*");

        if (!error) {
            setItems((prevArray) =>
                prevArray.map((item) =>
                    item.id === id ? { ...item, checked: !item.checked } : item
                )
            );
        } else {
            console.error(error);
        }
    }

    async function deleteChecked() {
        try {
            const ids = items
                .filter((item) => item.checked)
                .map((item) => item.id);
            await supabase.from("items").delete().in("id", ids);
        } catch (error) {
            console.error(error);
        }
    }
    return {
        deleteChecked,
        addListItem,
        setDesc,
        setAmount,
        items,
        setChecked,
        desc,
        amount,
        error,
    };
}

export default useItemList;
