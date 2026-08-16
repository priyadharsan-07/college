import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Receipt,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const StudentFeesPage: React.FC = () => {
  const { user } = useAuth();
  const { students, fees, recordFeePayment } = useData();
  const { showToast } = useToast();

  const currentStudent = students.find((s) => s.email === user?.email) || students[0];
  const feeRecord = fees.find((f) => f.studentId === currentStudent?.studentId) || fees[0];

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(feeRecord?.pendingAmount > 0 ? feeRecord.pendingAmount : 1500);
  const [paymentMode, setPaymentMode] = useState('Credit / Debit Card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeRecord) return;
    if (payAmount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    recordFeePayment(feeRecord.id, payAmount, paymentMode);
    showToast(`Tuition payment of $${payAmount.toLocaleString()} completed successfully! Receipt generated.`, 'success');
    setIsPayModalOpen(false);
  };

  const handleDownloadReceipt = () => {
    showToast(`Downloading official fee receipt (${feeRecord?.receiptNo})...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tuition Ledger & Online Payment
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your academic fees, installments, payment history, and download tax receipts.
          </p>
        </div>
        {feeRecord && feeRecord.pendingAmount > 0 && (
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Outstanding Fees</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      {feeRecord && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-slate-400">Total Billed Tuition</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              ${feeRecord.totalFees.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-2">Academic Year 2025-2026</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-emerald-600">Total Paid Amount</p>
            <p className="text-3xl font-extrabold text-emerald-700 mt-1">
              ${feeRecord.paidAmount.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-2">Receipt: {feeRecord.receiptNo}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <p className="text-xs font-semibold text-rose-600">Pending Balance</p>
            <p className="text-3xl font-extrabold text-rose-700 mt-1">
              ${feeRecord.pendingAmount.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Status:{' '}
              <span className="font-bold text-slate-700">{feeRecord.status}</span>
            </p>
          </div>
        </div>
      )}

      {/* Transaction Details */}
      {feeRecord && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Current Term Statement</h3>
              <p className="text-xs text-slate-500">Student Roll: {feeRecord.studentId}</p>
            </div>
            <button
              onClick={handleDownloadReceipt}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Receipt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-700 block">Tuition Breakdown</span>
              <div className="flex justify-between text-slate-600">
                <span>Tuition & Laboratory Charges</span>
                <span className="font-medium">${(feeRecord.totalFees * 0.75).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Library & Digital Resources</span>
                <span className="font-medium">${(feeRecord.totalFees * 0.15).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Campus Facilities & Sports</span>
                <span className="font-medium">${(feeRecord.totalFees * 0.1).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-700 block">Payment Activity</span>
              <div className="flex justify-between text-slate-600">
                <span>Last Payment Date</span>
                <span className="font-medium text-slate-900">{feeRecord.paymentDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Official Receipt Number</span>
                <span className="font-mono font-medium text-indigo-600">{feeRecord.receiptNo}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ledger Clearance</span>
                <span className="font-bold text-emerald-600">{feeRecord.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Online Tuition Payment Gateway"
        maxWidth="md"
      >
        {feeRecord && (
          <form onSubmit={handlePay} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5 text-xs text-indigo-950">
              <div className="flex justify-between">
                <span>Candidate Name:</span>
                <span className="font-bold">{feeRecord.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Balance:</span>
                <span className="font-extrabold text-rose-600">${feeRecord.pendingAmount.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount to Pay ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={feeRecord.pendingAmount > 0 ? feeRecord.pendingAmount : feeRecord.totalFees}
                required
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Channel
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Credit / Debit Card">Credit / Debit Card (Instant Clearance)</option>
                <option value="Net Banking">Net Banking (ACH Transfer)</option>
                <option value="UPI / QR Code">UPI / Instant Digital Wallet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Card / Account Identification
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPayModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition"
              >
                Authorize Payment (${payAmount.toLocaleString()})
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
