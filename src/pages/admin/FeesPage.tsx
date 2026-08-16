import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Receipt,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FeeRecord } from '../../types';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const FeesPage: React.FC = () => {
  const { fees, students, departments, recordFeePayment, updateFeeRecord } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedFeeRecord, setSelectedFeeRecord] = useState<FeeRecord | null>(null);

  const [paymentAmount, setPaymentAmount] = useState<number>(1000);
  const [paymentMode, setPaymentMode] = useState<string>('Online Payment');
  const [paymentRemarks, setPaymentRemarks] = useState<string>('Term installment payment');

  const totalCollected = fees.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalPending = fees.reduce((acc, curr) => acc + curr.pendingAmount, 0);
  const totalBilled = totalCollected + totalPending;
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  const handleOpenCollect = (fee: FeeRecord) => {
    setSelectedFeeRecord(fee);
    setPaymentAmount(fee.pendingAmount > 0 ? fee.pendingAmount : 1000);
    setIsCollectModalOpen(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeRecord) return;

    if (paymentAmount <= 0) {
      showToast('Please enter a valid payment amount', 'error');
      return;
    }

    recordFeePayment(selectedFeeRecord.id, paymentAmount, paymentMode);
    showToast(`Payment of $${paymentAmount.toLocaleString()} recorded for ${selectedFeeRecord.studentName}!`, 'success');
    setIsCollectModalOpen(false);
  };

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.receiptNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || f.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const exportCSV = () => {
    const headers = 'Student ID,Student Name,Department,Total Fees,Paid Amount,Pending Amount,Status,Last Payment Date,Receipt No\n';
    const rows = filteredFees
      .map(
        (f) =>
          `"${f.studentId}","${f.studentName}","${f.department}",$${f.totalFees},$${f.paidAmount},$${f.pendingAmount},"${f.status}","${f.paymentDate}","${f.receiptNo}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'apex_fee_collections.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Fee Ledgers to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fee Management & Accounts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tuition ledger, student installments, pending receivables, and digital receipts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Ledgers</span>
          </button>
        </div>
      </div>

      {/* Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Billed Tuition</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">${totalBilled.toLocaleString()}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600">Total Collected</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">${totalCollected.toLocaleString()}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-rose-600">Total Pending</p>
            <p className="text-2xl font-extrabold text-rose-700 mt-1">${totalPending.toLocaleString()}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-indigo-600">Collection Ratio</p>
            <p className="text-2xl font-extrabold text-indigo-700 mt-1">{collectionRate}%</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search student name, roll number, or receipt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Student ID & Name</th>
                <th className="py-3.5 px-4">Department & Year</th>
                <th className="py-3.5 px-4">Total Tuition</th>
                <th className="py-3.5 px-4">Paid Amount</th>
                <th className="py-3.5 px-4">Pending Balance</th>
                <th className="py-3.5 px-4">Last Payment Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No fee ledger records found.
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{fee.studentName}</p>
                        <p className="font-mono text-[11px] text-indigo-600 font-semibold">{fee.studentId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-800">{fee.department}</p>
                      <span className="text-[11px] text-slate-400">Year {fee.year}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      ${fee.totalFees.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      ${fee.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600">
                      ${fee.pendingAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <p className="font-medium text-slate-700">{fee.paymentDate || 'N/A'}</p>
                        <p className="font-mono text-[10px] text-slate-400">{fee.receiptNo}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          fee.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : fee.status === 'Partially Paid'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {fee.status === 'Paid' && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                        {fee.status === 'Partially Paid' && <Clock className="w-3 h-3 text-amber-500" />}
                        {fee.status === 'Pending' && <AlertCircle className="w-3 h-3 text-rose-500" />}
                        {fee.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenCollect(fee)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs transition"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Collect / Pay</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect / Record Fee Payment Modal */}
      <Modal
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        title="Record Fee Payment & Issue Receipt"
        maxWidth="md"
      >
        {selectedFeeRecord && (
          <form onSubmit={handleProcessPayment} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-slate-900">{selectedFeeRecord.studentName} ({selectedFeeRecord.studentId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-medium text-slate-800">{selectedFeeRecord.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Outstanding:</span>
                <span className="font-extrabold text-rose-600">${selectedFeeRecord.pendingAmount.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount Being Paid ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={selectedFeeRecord.pendingAmount > 0 ? selectedFeeRecord.pendingAmount : selectedFeeRecord.totalFees}
                required
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Channel / Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Online Payment">Online Payment Gateway (Debit/Credit)</option>
                <option value="Net Banking">Net Banking / Wire Transfer</option>
                <option value="Bank Demand Draft">Bank Demand Draft (DD)</option>
                <option value="Cash Counter">Cash at Accounts Desk</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Transaction / Receipt Remarks
              </label>
              <input
                type="text"
                value={paymentRemarks}
                onChange={(e) => setPaymentRemarks(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
                placeholder="e.g. Semester 5 installment"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCollectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition"
              >
                Confirm & Issue Receipt
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
