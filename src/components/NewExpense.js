import React, { useState } from 'react'
import './NewExpense.scss'
import supabase from '../supabase'

const NewExpense = ({ getExpenses }) => {
	const [enteredTitle, setEnteredTitle] = useState('')
	const [enteredAmount, setEnteredAmount] = useState(0)
	const [enteredDate, setEnteredDate] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	let year = enteredDate.split('-')
	console.log(enteredDate,year)
	

	const titleHandler = e => {
		setEnteredTitle(e.target.value)
	}

	const amountHandler = e => {
		const inputAmount = e.target.value

		if (isNaN(inputAmount)) {
			alert('Amount must be a number.')
		} else {
			setEnteredAmount(inputAmount)
		}
	}
	const dateHandler = e => {
		setEnteredDate(e.target.value)
	}


	const submitHandler = async e => {
		e.preventDefault()
		await supabase.from('Expenses').insert({
			Title: enteredTitle,
			Date: enteredDate,
			ExpensesAmount: +enteredAmount,
			filteredYear: year[0].toString()
		})

		// const expenseDate = {

		// 	id: Math.random().toString(),
		// 	title: enteredTitle,
		// 	amount: +enteredAmount,
		// 	date: new Date(enteredDate),
		// }

		setEnteredAmount('')
		setEnteredDate('')
		setEnteredTitle('')
		// props.onAddExpense(expenseDate)
		setIsEditing(false)
		getExpenses()
	}
	const editingHandler = () => {
		setIsEditing(true)
	}
	const stopEditingHandler = () => {
		setIsEditing(false)
	}

	return (
		<div className="new-expense">
			{!isEditing && <button onClick={editingHandler}>Add New Expense</button>}
			{isEditing && (
				<form onSubmit={submitHandler}>
					<div className="new-expense__controls">
						<div className="new-expense__control">
							<label>Title</label>
							<input type="text" value={enteredTitle} onChange={titleHandler} />
						</div>
					</div>
					<div className="new-expense__controls">
						<div className="new-expense__control">
							<label>Amount</label>
							<input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountHandler} />
						</div>
					</div>
					<div className="new-expense__controls">
						<div className="new-expense__control">
							<label>Date</label>
							<input type="date" min="2023-01-01" max="2026-01-01" onChange={dateHandler} value={enteredDate} />
						</div>
					</div>
					<div className="new-expene__actions">
						<button type="submit">Add Expense</button>
						<button type="button" onClick={stopEditingHandler}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default NewExpense