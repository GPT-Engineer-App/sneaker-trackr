import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "expense", brand: "Nike" },
    { id: 2, date: "2023-10-05", amount: 150, type: "income", brand: "Adidas" },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "expense",
    brand: "Nike",
  });
  const [editTransaction, setEditTransaction] = useState(null);

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    setNewTransaction({ date: "", amount: "", type: "expense", brand: "Nike" });
    toast("Transaction added successfully.");
  };

  const handleEditTransaction = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id ? editTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setEditTransaction(null);
    toast("Transaction updated successfully.");
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    toast("Transaction deleted successfully.");
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.brand}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Transaction</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Date</Label>
                            <Input
                              type="date"
                              value={editTransaction?.date || transaction.date}
                              onChange={(e) =>
                                setEditTransaction({
                                  ...transaction,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Amount</Label>
                            <Input
                              type="number"
                              value={editTransaction?.amount || transaction.amount}
                              onChange={(e) =>
                                setEditTransaction({
                                  ...transaction,
                                  amount: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={editTransaction?.type || transaction.type}
                              onValueChange={(value) =>
                                setEditTransaction({
                                  ...transaction,
                                  type: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Brand</Label>
                            <Select
                              value={editTransaction?.brand || transaction.brand}
                              onValueChange={(value) =>
                                setEditTransaction({
                                  ...transaction,
                                  brand: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Nike">Nike</SelectItem>
                                <SelectItem value="Adidas">Adidas</SelectItem>
                                <SelectItem value="Puma">Puma</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={() => handleEditTransaction(transaction.id)}>
                            Save
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Brand</Label>
                <Select
                  value={newTransaction.brand}
                  onValueChange={(value) =>
                    setNewTransaction({ ...newTransaction, brand: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nike">Nike</SelectItem>
                    <SelectItem value="Adidas">Adidas</SelectItem>
                    <SelectItem value="Puma">Puma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTransaction}>Add Transaction</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;