import React, { useState } from 'react';
import { Upload, Download, Check, AlertCircle, Info } from 'lucide-react';
import ExcelQuestionParser from '../utils/excelParser';
import QuizService from '../services/quizService';

/**
 * Admin Page for Quiz Management
 * 
 * IMPORTANT: This page should be protected in production or removed after initial setup
 * For development only - allows importing questions from Excel
 */

const QUIZ_ID = 'history-cpv';

const QuizAdminPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [clearOldQuestions, setClearOldQuestions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus({ type: 'idle', message: '' });
    }
  };

  const handleImport = async () => {
    if (!file) {
      setStatus({ type: 'error', message: 'Vui lòng chọn file Excel' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: 'idle', message: 'Đang xử lý file...' });

      // Parse Excel file
      const questions = await ExcelQuestionParser.parseFile(file);

      setStatus({
        type: 'idle',
        message: `Đã phân tích ${questions.length} câu hỏi. Đang tải lên Firebase...`,
      });

      // Create/update quiz metadata
      await QuizService.createOrUpdateQuiz(QUIZ_ID, {
        title: 'Lịch Sử Đảng Cộng Sản Việt Nam',
        description: 'Kiểm tra kiến thức về giai đoạn Đổi Mới (1986-2018)',
        totalQuestions: questions.length,
        questionsPerAttempt: 20,
      });

      // Import questions to Firestore
      await QuizService.importQuestions(QUIZ_ID, questions, clearOldQuestions);

      setStatus({
        type: 'success',
        message: `✅ Đã import thành công ${questions.length} câu hỏi!${clearOldQuestions ? ' (Đã xóa câu hỏi cũ)' : ''}`,
      });

      setFile(null);
      // Reset file input
      const input = document.getElementById('file-input') as HTMLInputElement;
      if (input) input.value = '';
    } catch (error: any) {
      console.error('Import error:', error);
      setStatus({
        type: 'error',
        message: `❌ Lỗi: ${error.message || 'Không thể import câu hỏi'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    ExcelQuestionParser.downloadTemplate('mau-cau-hoi-quiz.xlsx');
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">
                ⚠️ Trang Quản Trị - Dành Cho Chủ Sở Hữu
              </h3>
              <p className="text-yellow-800">
                Trang này cho phép import câu hỏi từ Excel vào Firebase.{' '}
                <strong>Chỉ sử dụng khi thiết lập hoặc cập nhật câu hỏi.</strong>
              </p>
              <p className="text-yellow-800 mt-2 text-sm">
                💡 Sau khi import xong, bạn có thể ẩn hoặc xóa trang này khỏi production.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Quản Lý Câu Hỏi Quiz
          </h1>
          <p className="text-gray-600 mb-8">
            Import câu hỏi từ file Excel vào hệ thống Firebase
          </p>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Hướng Dẫn Sử Dụng
            </h3>
            <ol className="space-y-2 text-blue-800 list-decimal list-inside">
              <li>Tải file mẫu Excel (nút bên dưới)</li>
              <li>Điền câu hỏi vào file Excel theo định dạng:
                <ul className="ml-6 mt-2 space-y-1 text-sm list-disc list-inside">
                  <li><code>question</code>: Nội dung câu hỏi</li>
                  <li><code>optionA, optionB, optionC, optionD</code>: 4 đáp án</li>
                  <li><code>correct</code>: Đáp án đúng (A, B, C hoặc D)</li>
                  <li><code>category</code> (tùy chọn): Danh mục câu hỏi</li>
                </ul>
              </li>
              <li>Chọn file Excel đã điền</li>
              <li>Nhấn "Import Câu Hỏi" để tải lên Firebase</li>
            </ol>
          </div>

          {/* Download Template Button */}
          <div className="mb-8">
            <button
              onClick={handleDownloadTemplate}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              Tải File Mẫu Excel
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chọn File Excel (.xlsx)
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="file-input"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              {file && (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-1" />
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Clear Old Questions Option */}
          <div className="mb-6">
            <label className="flex items-center space-x-3 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl cursor-pointer hover:bg-yellow-100 transition-colors">
              <input
                type="checkbox"
                checked={clearOldQuestions}
                onChange={(e) => setClearOldQuestions(e.target.checked)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  🗑️ Xóa tất cả câu hỏi cũ trước khi import
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Khuyến nghị:</strong> Bật tùy chọn này để tránh trùng lặp câu hỏi.
                  Nếu tắt, câu hỏi mới sẽ được thêm vào danh sách hiện có.
                </div>
              </div>
            </label>
          </div>

          {/* Import Button */}
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Import Câu Hỏi vào Firebase
              </>
            )}
          </button>

          {/* Status Message */}
          {status.message && (
            <div
              className={`
              mt-6 p-4 rounded-xl border-2
              ${
                status.type === 'success'
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : status.type === 'error'
                  ? 'bg-red-50 border-red-300 text-red-800'
                  : 'bg-blue-50 border-blue-300 text-blue-800'
              }
            `}
            >
              <p className="font-medium">{status.message}</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Thông Tin Quiz</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Quiz ID</div>
                <div className="font-mono font-bold text-gray-900">{QUIZ_ID}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Số câu mỗi lần thi</div>
                <div className="font-bold text-gray-900">20 câu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            💡 <strong>Lưu ý:</strong> Mỗi lần import sẽ thêm câu hỏi mới vào Firebase.
            Để xóa câu hỏi cũ, vui lòng truy cập Firebase Console.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizAdminPage;
